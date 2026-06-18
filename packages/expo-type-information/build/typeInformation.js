"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTypeInformation = serializeTypeInformation;
exports.deserializeTypeInformation = deserializeTypeInformation;
exports.withPreparedSingleFile = withPreparedSingleFile;
exports.getFileTypeInformation = getFileTypeInformation;
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const sourcekittenTypeInformation_1 = require("./swift/sourcekittenTypeInformation");
const utils_1 = require("./utils");
const typeInformation_types_1 = require("./typeInformation.types");
/**
 * Used for testing purposes, maps Sets and Maps to Arrays and returns `FileTypeInformationSerialized` object which can be written to a JSON.
 * @param fileTypeinformation `FileTypeInformation` object to serialize.
 * @returns a `FileTypeInformationSerialized` object.
 * @header TypeInformationAbstraction
 */
function serializeTypeInformation({ usedTypeIdentifiers, declaredTypeIdentifiers, inferredTypeParametersCount, typeIdentifierDefinitionMap, moduleClasses, records, enums, }) {
    return {
        usedTypeIdentifiersList: [...usedTypeIdentifiers.keys()].sort(),
        declaredTypeIdentifiersList: [...declaredTypeIdentifiers.keys()].sort(),
        inferredTypeParametersCountList: [...inferredTypeParametersCount.entries()].sort(),
        typeIdentifierDefinitionList: [...typeIdentifierDefinitionMap.entries()].sort(),
        moduleClasses,
        records,
        enums,
    };
}
/**
 *  Used for testing purposes, maps Arrays to Sets and Maps depending on the field and returns `FileTypeInformation` object.
 * @param fileTypeinformationSerialized `FileTypeInformationSerialized` object to deserialize.
 * @returns `FileTypeInformation` object.
 * @header TypeInformationAbstraction
 */
function deserializeTypeInformation({ usedTypeIdentifiersList, declaredTypeIdentifiersList, inferredTypeParametersCountList, typeIdentifierDefinitionList, moduleClasses, records, enums, }) {
    return {
        usedTypeIdentifiers: new Set(usedTypeIdentifiersList),
        declaredTypeIdentifiers: new Set(declaredTypeIdentifiersList),
        inferredTypeParametersCount: new Map(inferredTypeParametersCountList),
        typeIdentifierDefinitionMap: new Map(typeIdentifierDefinitionList),
        moduleClasses,
        records,
        enums,
    };
}
async function mergeFileContents(absoluteFilePaths) {
    const filesContents = await (0, utils_1.taskAll)(absoluteFilePaths, (filePath) => fs.promises.readFile(filePath, 'utf-8'));
    return filesContents.join('');
}
async function withTempFile(content, fn) {
    const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'type-gen-'));
    const filePath = path.join(tempDir, 'TypeInformationTemporaryFile.swift');
    try {
        await fs.promises.writeFile(filePath, content, 'utf8');
        return await fn(filePath);
    }
    finally {
        await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
}
async function withPreparedSingleFile({ input, typeInference, mapUnicodeCharacters }, fn) {
    const shouldPreprocessFile = typeInference === typeInformation_types_1.TypeInferenceOption.PREPROCESS_AND_INFERENCE || mapUnicodeCharacters;
    if (!shouldPreprocessFile && input.type === 'file' && input.inputFileAbsolutePaths.length === 0) {
        return fn(input.inputFileAbsolutePaths[0]);
    }
    const fileContent = input.type === 'file'
        ? await mergeFileContents(input.inputFileAbsolutePaths)
        : input.fileContent;
    const preprocessFileOptions = {
        preprocessReturns: shouldPreprocessFile,
        mapUnicodeCharacters,
    };
    if (shouldPreprocessFile) {
        return withTempFile((0, sourcekittenTypeInformation_1.preprocessSwiftFile)(fileContent, preprocessFileOptions), fn);
    }
    return withTempFile(fileContent, fn);
}
/**
 * Reads and extracts `FileTypeInformation` from either a provided file path or a raw string of source code.
 * If a raw string is provided, or if the `PREPROCESS_AND_INFERENCE` inference option is selected,
 * the function will create a temporary file with the (optionally preprocessed) content to facilitate parsing.
 * @param options - Configuration object containing the input source (file or string) and the desired level of type inference.
 * @returns A promise that resolves to a `FileTypeInformation` object if the input was parsed successfully. Otherwise, it resolves to `null`.
 * @header TypeInformationAbstraction
 */
async function getFileTypeInformation({ input, typeInference, mapUnicodeCharacters, }) {
    const shouldPreprocessFile = typeInference === typeInformation_types_1.TypeInferenceOption.PREPROCESS_AND_INFERENCE || mapUnicodeCharacters;
    const typeInferenceOn = typeInference !== typeInformation_types_1.TypeInferenceOption.NO_INFERENCE;
    if (!shouldPreprocessFile && input.type === 'file' && input.inputFileAbsolutePaths.length === 0) {
        return (0, sourcekittenTypeInformation_1.getSwiftFileTypeInformation)(input.inputFileAbsolutePaths[0], {
            typeInference: typeInferenceOn,
        });
    }
    return withPreparedSingleFile({ input, typeInference, mapUnicodeCharacters }, async (tempFilePath) => {
        return (0, sourcekittenTypeInformation_1.getSwiftFileTypeInformation)(tempFilePath, { typeInference: typeInferenceOn });
    });
}
//# sourceMappingURL=typeInformation.js.map