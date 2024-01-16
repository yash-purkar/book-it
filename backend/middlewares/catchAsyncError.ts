import { NextRequest, NextResponse } from "next/server";
import ErrorHandler from "../utils/errorHandler";
/**
 * @params - Controller function
 * @controller - This is a controller fn.
 * @return - returning the async function which will assign to that fn where we are calling catchAsyncError. And that will have clousre to the controller so fn will cal the controller again.
 */

type ControllerFunction = (
  request: NextRequest,
  params: any
) => Promise<NextResponse>;

type ValidationError = {
  message:string
}

// Higher order function to handle async errors.
export const catchAsyncError =
  (controller: ControllerFunction) =>
  async (request: NextRequest, params: any) => {
    try {
      // executing provided controller fn.
      return await controller(request, params);
    } catch (error: any) {
      // If we call api/rooms/65a3a1aacb7b8ff82335e396f with any extra value in this case f is extra so it throws castError
      if (error.name === "CastError") {
        error.message = `Resource not found. Invalid ${error.path}`;
        error.statusCode = 400;
      }
      // when will add a room and didn't pass any required field it will throw Validaion error.
      if(error.name === "ValidationError") {
        // If we didn't add more than 1 field it will give an object of all errors.
        error.message = Object.values<ValidationError>(error.errors).map((value) => value.message);
        error.statusCode = 400;
      }
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: error.statusCode }
      );
    }
  };

// We are taking the controller function a prop. E.g getPostDetails
// And this catchAsyncError is returning another async function in that takes NextRequest and some parameters.
// In side this it calls that given controller fn. If error occurs it will return nextResponse.

// So when we call the getPostDetails function from the /api/rooms/:id route
// It will call this catchAsyncError function and the getPostDetails will pass to it as a controller.
// And this catchAsyncError is returning another fn in that will assign to getPostDetails function.
// And in route we'll get same response as we were getting.
// We have given the req and params in fn which catchAsyncError is returning because this fn will assign to the getPostDetails fn and that takes this. And that fn will call the controller fn which is actually clousure.

// Benefit of this fn is we don't have to write try catch block for every controller fn.
