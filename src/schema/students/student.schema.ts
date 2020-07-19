import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Student {

    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    grade: string;
}