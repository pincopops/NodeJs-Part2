import { Static, Type } from "@sinclair/typebox";

export const iphonesSchema = Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    lenght: Type.Integer(),
    width: Type.Integer()
}, { additionalProperties: false});

export type IphonesData = Static<typeof iphonesSchema>