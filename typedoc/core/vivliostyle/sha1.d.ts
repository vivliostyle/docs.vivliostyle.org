/**
 * @return big-endian byte sequence
 */
export declare function encode32(n: number): string;
/**
 * @param bytes big-endian byte sequence
 */
export declare function decode32(bytes: string): number;
/**
 * @param bytes chars with codes 0 - 255 that represent message byte values
 * @return big-endian uint32 numbers representing sha1 hash
 */
export declare function bytesToSHA1Int32(bytes: string): number[];
/**
 * @param bytes chars with codes 0 - 255 that represent message byte values
 * @return uint8 numbers representing sha1 hash
 */
export declare function bytesToSHA1Int8(bytes: string): number[];
/**
 * @param bytes chars with codes 0 - 255 that represent message byte values
 * @return chars with codes 0 - 255 equal to SHA1 hash of the input
 */
export declare function bytesToSHA1Bytes(bytes: string): string;
/**
 * @param bytes chars with codes 0 - 255 that represent message byte values
 * @return hex-encoded SHA1 hash
 */
export declare function bytesToSHA1Hex(bytes: string): string;
/**
 * @param bytes chars with codes 0 - 255 that represent message byte values
 * @return base64-encoded SHA1 hash of the input
 */
export declare function bytesToSHA1Base64(bytes: string): string;
