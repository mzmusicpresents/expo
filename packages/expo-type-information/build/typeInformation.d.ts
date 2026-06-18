import { FileTypeInformation, FileTypeInformationSerialized, GetFileTypeInformationOptions } from './typeInformation.types';
/**
 * Used for testing purposes, maps Sets and Maps to Arrays and returns `FileTypeInformationSerialized` object which can be written to a JSON.
 * @param fileTypeinformation `FileTypeInformation` object to serialize.
 * @returns a `FileTypeInformationSerialized` object.
 * @header TypeInformationAbstraction
 */
export declare function serializeTypeInformation({ usedTypeIdentifiers, declaredTypeIdentifiers, inferredTypeParametersCount, typeIdentifierDefinitionMap, moduleClasses, records, enums, }: FileTypeInformation): FileTypeInformationSerialized;
/**
 *  Used for testing purposes, maps Arrays to Sets and Maps depending on the field and returns `FileTypeInformation` object.
 * @param fileTypeinformationSerialized `FileTypeInformationSerialized` object to deserialize.
 * @returns `FileTypeInformation` object.
 * @header TypeInformationAbstraction
 */
export declare function deserializeTypeInformation({ usedTypeIdentifiersList, declaredTypeIdentifiersList, inferredTypeParametersCountList, typeIdentifierDefinitionList, moduleClasses, records, enums, }: FileTypeInformationSerialized): FileTypeInformation;
export declare function withPreparedSingleFile<T>({ input, typeInference, mapUnicodeCharacters }: GetFileTypeInformationOptions, fn: (filePath: string) => Promise<T>): Promise<T>;
/**
 * Reads and extracts `FileTypeInformation` from either a provided file path or a raw string of source code.
 * If a raw string is provided, or if the `PREPROCESS_AND_INFERENCE` inference option is selected,
 * the function will create a temporary file with the (optionally preprocessed) content to facilitate parsing.
 * @param options - Configuration object containing the input source (file or string) and the desired level of type inference.
 * @returns A promise that resolves to a `FileTypeInformation` object if the input was parsed successfully. Otherwise, it resolves to `null`.
 * @header TypeInformationAbstraction
 */
export declare function getFileTypeInformation({ input, typeInference, mapUnicodeCharacters, }: GetFileTypeInformationOptions): Promise<FileTypeInformation | null>;
