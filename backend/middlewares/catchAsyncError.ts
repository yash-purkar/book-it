import { NextRequest, NextResponse } from "next/server";
import ErrorHandler from "../utils/errorHandler";

/**
 * @params - Controller function
 * @handler - This is a controller fn.
 */

type HandlerFunction = (
  request: NextRequest,
  params: any
) => Promise<NextResponse>;

// Higher order function to handle async errors.
export const catchAsyncError =
  (handler: HandlerFunction) => async (request: NextRequest, params: any) => {
    try {
      // executing provided handler fn which is controller.
      return await handler(request, params);
    } catch (error: any) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: error.statusCode }
      );
    }
  };

// We are taking the controller: handler function a prop. E.g getPostDetails
// And this catchAsyncError is returning another async function in that takes NextRequest and some parameters.
// In side this it calls that given handler fn. If error occurs it will return nextResponse.

// So when we call the getPostDetails function from the /api/rooms/:id route
// It will call this catchAsyncError function and the getPostDetails will pass to it as a handler.
// And this catchAsyncError is returning another fn in that will assign to getPostDetails function.
// And in route we'll get same response as we were getting.
// We have given the req and params in fn which catchAsyncError is returning because this fn will assign to the getPostDetails fn and that takes this. And that fn will call the handler fn which is actually clousure.

// Benefit of this fn is we don't have to write try catch block for every controller fn.
