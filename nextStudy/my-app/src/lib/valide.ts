import { z } from "zod";

export const UserSchemaForPost = z.object({
    name : z.string()
            .min(1,"名前を入力してください")
            .max(30,"名前は30文字以内です"),
    password : z.string()
                .min(8,"パスワードは8文字以上必要です")
                .max(30,"パスワードは30文字以内です"),
    description : z.string()
                   .max(100,"説明は30文字以内です")
                   .optional(),
 
    });

export const UserSchemaForPut = z.object({
    id : z.number()
            .min(1,"idを入力してください"),
    name : z.string()
            .min(1,"名前を入力してください")
            .max(30,"名前は30文字以内です")
            .optional(),
    password : z.string()
                .min(8,"パスワードは8文字以上必要です")
                .max(30,"パスワードは30文字以内です")
                .optional(),
    description : z.string()
                   .max(100,"説明は30文字以内です")
                   .optional(),
 
    });


// {
    // "id": 1,　数字、一意、プラス１していく
    // "name": "ccccc",　文字、文字数30まで
    // "password": "bbbb",　文字、文字数30まで
    // "description": "bbbbb"　文字、文字数100まで
    // }