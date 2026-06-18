"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeInferenceOption = exports.ConvertibleType = exports.BasicType = exports.TypeKind = exports.IdentifierKind = void 0;
/**
 * Represents the kind of a parsed identifier from a native file.
 */
var IdentifierKind;
(function (IdentifierKind) {
    IdentifierKind[IdentifierKind["ENUM"] = 0] = "ENUM";
    IdentifierKind[IdentifierKind["RECORD"] = 1] = "RECORD";
})(IdentifierKind || (exports.IdentifierKind = IdentifierKind = {}));
/**
 * Categorizes the type node within the abstract syntax tree.
 */
var TypeKind;
(function (TypeKind) {
    TypeKind[TypeKind["BASIC"] = 0] = "BASIC";
    TypeKind[TypeKind["CONVERTIBLE"] = 1] = "CONVERTIBLE";
    TypeKind[TypeKind["IDENTIFIER"] = 2] = "IDENTIFIER";
    TypeKind[TypeKind["SUM"] = 3] = "SUM";
    TypeKind[TypeKind["PARAMETRIZED"] = 4] = "PARAMETRIZED";
    TypeKind[TypeKind["OPTIONAL"] = 5] = "OPTIONAL";
    TypeKind[TypeKind["ARRAY"] = 6] = "ARRAY";
    TypeKind[TypeKind["DICTIONARY"] = 7] = "DICTIONARY";
})(TypeKind || (exports.TypeKind = TypeKind = {}));
/**
 * Represents a basic type that is not user defined.
 */
var BasicType;
(function (BasicType) {
    BasicType[BasicType["ANY"] = 0] = "ANY";
    BasicType[BasicType["STRING"] = 1] = "STRING";
    BasicType[BasicType["NUMBER"] = 2] = "NUMBER";
    BasicType[BasicType["BOOLEAN"] = 3] = "BOOLEAN";
    BasicType[BasicType["VOID"] = 4] = "VOID";
    BasicType[BasicType["UNDEFINED"] = 5] = "UNDEFINED";
    BasicType[BasicType["NEVER"] = 6] = "NEVER";
    BasicType[BasicType["OBJECT"] = 7] = "OBJECT";
    /** Represents a type that couldn't be resolved */
    BasicType[BasicType["UNRESOLVED"] = 8] = "UNRESOLVED";
})(BasicType || (exports.BasicType = BasicType = {}));
/**
 * Represents a type for which there are type converters and is not basic in TypeScript.
 */
var ConvertibleType;
(function (ConvertibleType) {
    ConvertibleType[ConvertibleType["COLOR"] = 0] = "COLOR";
    ConvertibleType[ConvertibleType["UINT8_ARRAY"] = 1] = "UINT8_ARRAY";
    ConvertibleType[ConvertibleType["CG_POINT"] = 2] = "CG_POINT";
    ConvertibleType[ConvertibleType["CG_SIZE"] = 3] = "CG_SIZE";
    ConvertibleType[ConvertibleType["CG_VECTOR"] = 4] = "CG_VECTOR";
    ConvertibleType[ConvertibleType["CG_RECT"] = 5] = "CG_RECT";
    ConvertibleType[ConvertibleType["JS_FUNCTION"] = 6] = "JS_FUNCTION";
})(ConvertibleType || (exports.ConvertibleType = ConvertibleType = {}));
/**
 * Defines the level of type inference to apply when extracting type information.
 * > **Note:** In case where type inference is on, it may take more then twice the time to compute the type information.
 */
var TypeInferenceOption;
(function (TypeInferenceOption) {
    /** No type inference will be performed. */
    TypeInferenceOption[TypeInferenceOption["NO_INFERENCE"] = 0] = "NO_INFERENCE";
    /** Basic type inference will be applied. */
    TypeInferenceOption[TypeInferenceOption["SIMPLE_INFERENCE"] = 1] = "SIMPLE_INFERENCE";
    /** Preprocesses the file by injecting returns to extract more type info from sourcekitten. */
    TypeInferenceOption[TypeInferenceOption["PREPROCESS_AND_INFERENCE"] = 2] = "PREPROCESS_AND_INFERENCE";
})(TypeInferenceOption || (exports.TypeInferenceOption = TypeInferenceOption = {}));
//# sourceMappingURL=typeInformation.types.js.map