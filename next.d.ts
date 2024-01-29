import {fetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import { IUser } from './backend/models/user'
import { NextRequest } from 'next/server'

// For redux
declare module "@reduxjs/toolkit/query/react" {
    interface fetchBaseQueryError {
        data: any
    }
}

// Bcz we want to add use in nextReqest in auth middleware.
declare module "next/server" {
    interface NextRequest {
        user:IUser
    }
}