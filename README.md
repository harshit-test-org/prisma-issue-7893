## Introduction

This repository contains reproduction for https://github.com/prisma/prisma/issues/7893


## Version Information

```
Environment variables loaded from prisma\.env
prisma               : 2.27.0-dev.50
@prisma/client       : 2.27.0-dev.50
Current platform     : windows
Query Engine         : query-engine 93bc5022cab05b6a70742ec1b74ee9a951f7b568 (at node_modules\@prisma\engines\query-engine-windows.exe)
Migration Engine     : migration-engine-cli 93bc5022cab05b6a70742ec1b74ee9a951f7b568 (at node_modules\@prisma\engines\migration-engine-windows.exe)
Introspection Engine : introspection-core 93bc5022cab05b6a70742ec1b74ee9a951f7b568 (at node_modules\@prisma\engines\introspection-engine-windows.exe)
Format Binary        : prisma-fmt 93bc5022cab05b6a70742ec1b74ee9a951f7b568 (at node_modules\@prisma\engines\prisma-fmt-windows.exe)
Default Engines Hash : 93bc5022cab05b6a70742ec1b74ee9a951f7b568
Studio               : 0.410.0
Preview Features     : selectRelationCount
```


## Steps

1. Clone the repository and install the deps using `yarn`
2. Change the credentials in prisma/.env
3. Push the schema to the database using `npx prisma db push`
4. Run `yarn start` to reproduce.

The following error will be thrown:
```
yarn run v1.22.5
$ ts-node main.ts
prisma:query SELECT "public"."users"."id", "public"."users"."name", "public"."users"."email", "public"."users"."email_verified", "public"."users"."image", "public"."users"."created_at", "public"."users"."updated_at", "public"."users"."views", "public"."users"."slug", "public"."users"."userId", "aggr_selection_0_User"."_aggr_count_followers" FROM "public"."users" LEFT JOIN (SELECT "public"."users"."id", COUNT(*) AS "_aggr_count_followers" FROM "public"."_UserFollows" INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."A")) INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."B")) GROUP BY "public"."users"."id") AS "aggr_selection_0_User" ON ("public"."users"."id" = "aggr_selection_0_User"."id") WHERE "public"."users"."id" = $1 LIMIT $2 OFFSET $3
prisma:query SELECT "public"."users"."id", "public"."users"."name", "public"."users"."email", "public"."users"."email_verified", "public"."users"."image", "public"."users"."created_at", "public"."users"."updated_at", "public"."users"."views", "public"."users"."slug", "public"."users"."userId", "aggr_selection_0_User"."_aggr_count_followers" FROM "public"."users" LEFT JOIN (SELECT "public"."users"."id", COUNT(*) AS "_aggr_count_followers" FROM "public"."_UserFollows" INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."A")) INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."B")) GROUP BY "public"."users"."id") AS "aggr_selection_0_User" ON ("public"."users"."id" = "aggr_selection_0_User"."id") WHERE "public"."users"."id" = $1 LIMIT $2 OFFSET $3
prisma:query SELECT "public"."users"."id", "public"."users"."name", "public"."users"."email", "public"."users"."email_verified", "public"."users"."image", "public"."users"."created_at", "public"."users"."updated_at", "public"."users"."views", "public"."users"."slug", "public"."users"."userId", "aggr_selection_0_User"."_aggr_count_followers" FROM "public"."users" LEFT JOIN (SELECT "public"."users"."id", COUNT(*) AS "_aggr_count_followers" FROM "public"."_UserFollows" INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."A")) INNER JOIN "public"."users" ON ("public"."users"."id" = ("public"."_UserFollows"."B")) GROUP BY "public"."users"."id") AS "aggr_selection_0_User" ON ("public"."users"."id" = "aggr_selection_0_User"."id") WHERE "public"."users"."id" = $1 LIMIT $2 OFFSET $3
(node:15260) UnhandledPromiseRejectionWarning: Error:
Invalid `prisma.user.findUnique()` invocation:


  Error occurred during query execution:
ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("42712"), message: "table name \"users\" specified more than once", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("parse_relation.c"), line: Some(445), routine: Some("checkNameSpaceConflicts") }) }) })
    at cb (C:\Users\harshit\code\reproductions\issue_6774\node_modules\@prisma\client\runtime\index.js:34804:17)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
    at main (C:\Users\harshit\code\reproductions\issue_6774\main.ts:8:17)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:15260) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing ins
ide of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To termin
ate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodej
s.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)(node:15260) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
Terminate batch job (Y/N)?
```

