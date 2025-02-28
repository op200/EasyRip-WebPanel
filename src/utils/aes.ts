import CryptoJS from "crypto-js";

/**
 * AES 加密函数，返回 UTF-8 的 HEX 格式
 * @param plaintext 明文字符串
 * @param key 密钥字符串（16字节，十六进制格式）
 * @returns 加密后的密文字符串（HEX 格式）
 */
export function encrypt(plaintext: string, key: string): string {
    // 生成随机的16字节IV
    const iv = CryptoJS.lib.WordArray.random(16);
    // 加密
    const ciphertext = CryptoJS.AES.encrypt(
        plaintext,
        CryptoJS.enc.Hex.parse(key), // 使用Hex格式解析密钥
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return iv.toString(CryptoJS.enc.Hex) + ciphertext.toString(CryptoJS.format.Hex);
}

/**
 * AES 解密函数，输入为 UTF-8 的 HEX 格式
 * @param ciphertext 密文字符串（HEX 格式）
 * @param key 密钥字符串（16字节，十六进制格式）
 * @returns 解密后的明文字符串
 */
export function decrypt(ciphertextHex: string, key: string): string {
    // 解密
    const bytes = CryptoJS.AES.decrypt(
        CryptoJS.enc.Hex.parse(ciphertextHex.slice(32)).toString(CryptoJS.enc.Base64), // 从密文中提取密文部分
        CryptoJS.enc.Hex.parse(key), // 使用Hex格式解析密钥
        {
            iv: CryptoJS.enc.Hex.parse(ciphertextHex.slice(0, 32)), // 从密文中提取IV
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    // 返回解密后的明文
    return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * 测试函数
 */
export function testAES() {
    // 使用与Python代码相同的密钥（16字节Hex格式）
    const aesKey = "48c8947f69c054a5caa934674ce8881d";

    // 测试数据
    const test2 = "test 密文测试";

    // 加密
    const encrypted = encrypt(test2, aesKey);
    console.log(`Encrypted: ${encrypted}`);

    // 解密
    const decrypted = decrypt(encrypted, aesKey);
    console.log(`Decrypted: ${decrypted}`);
}