import {
    shouldUseOptionalDecorator,
    shouldUseRequiredDecorator,
} from "./apiPropertyMatchesPropertyOptionality";
import {testCases} from "./apiPropertyMatchesPropertyOptionality.test-data";
import {typedTokenHelpers} from "../../utils/typedTokenHelpers";
import {
    fakeContext,
    fakeFilePath,
} from "../../utils/nestModules/nestProvidedInjectableMapper.test-date";
import {TSESTree} from "@typescript-eslint/types";

// should probably be split up into multiple tests
describe("apiPropertyMatchesPropertyOptionality", () => {
    test.each(testCases)(
        "is an expected response for %#",
        (testCase: {
            moduleCode: string;
            shouldUseOptionalDecorator: boolean;
            shouldUseRequiredDecorator: boolean;
            message: string;
        }) => {
            const ast = typedTokenHelpers.parseStringToAst(
                testCase.moduleCode,
                fakeFilePath,
                fakeContext
            );

            const shouldUseOptional = shouldUseOptionalDecorator(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ast.body[0] as TSESTree.ClassDeclaration).body
                    .body[0] as TSESTree.ClassProperty
            );
            expect(shouldUseOptional).toEqual(
                testCase.shouldUseOptionalDecorator
            );

            const shouldUseRequired = shouldUseRequiredDecorator(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ast.body[0] as TSESTree.ClassDeclaration).body
                    .body[0] as TSESTree.ClassProperty
            );
            expect(shouldUseRequired).toEqual(
                testCase.shouldUseRequiredDecorator
            );
        }
    );
});