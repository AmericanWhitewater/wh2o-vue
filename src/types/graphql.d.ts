// graphql.d.ts file
declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}
declare module "*.gql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}
