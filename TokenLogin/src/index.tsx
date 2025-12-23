import { storage } from "@vendetta/plugin";

// ストレージの型定義
interface TokenAccount {
    token: string;
    username?: string;
    discriminator?: string;
    id?: string;
    addedAt: number;
}

// ストレージキー
const STORAGE_KEY = "accounts";

// ストレージから読み込み
function loadAccounts(): Record<string, TokenAccount> {
    return storage[STORAGE_KEY] || {};
}

// ストレージに保存
function saveAccounts(accounts: Record<string, TokenAccount>): void {
    storage[STORAGE_KEY] = accounts;
}

// 保存されているアカウント一覧を取得
function listAccounts(): string {
    const accounts = Object.values(loadAccounts());
    
    if (accounts.length === 0) {
        return "❌ No saved accounts found.";
    }

    const accountList = accounts.map((acc, index) => {
        const username = acc.username ? `${acc.username}${acc.discriminator ? `#${acc.discriminator}` : ""}` : "Unknown";
        const addedDate = new Date(acc.addedAt).toLocaleDateString();
        return `${index + 1}. ${username} (ID: ${acc.id}) - Added: ${addedDate}`;
    }).join("\n");

    return `**Saved Accounts (${accounts.length}):**\n${accountList}`;
}

// トークンでログインする
async function loginWithToken(token: string): Promise<{ success: boolean; message: string }> {
    try {
        // トークンの検証とユーザー情報取得
        const response = await fetch("https://discord.com/api/v9/users/@me", {
            headers: {
                Authorization: token
            }
        });

        if (!response.ok) {
            return {
                success: false,
                message: "Invalid token or failed to fetch user information"
            };
        }

        const user = await response.json();

        // ストレージに保存
        const accounts = loadAccounts();
        accounts[user.id] = {
            token: token,
            username: user.username,
            discriminator: user.discriminator,
            id: user.id,
            addedAt: Date.now()
        };
        saveAccounts(accounts);

        return {
            success: true,
            message: `Successfully added account: ${user.username}${user.discriminator ? `#${user.discriminator}` : ""}`
        };
    } catch (error: any) {
        return {
            success: false,
            message: `Login failed: ${error?.message || "Unknown error"}`
        };
    }
}

// アカウントを削除
function removeAccount(userId: string): string {
    const accounts = loadAccounts();
    
    if (!accounts[userId]) {
        return `❌ Account with ID ${userId} not found.`;
    }

    const account = accounts[userId];
    delete accounts[userId];
    saveAccounts(accounts);
    
    return `✅ Removed account: ${account.username}${account.discriminator ? `#${account.discriminator}` : ""}`;
}

// プラグイン定義
export default {
    onLoad() {
        // Revengeでは起動時に何もしない（コマンドは別途登録）
    },

    onUnload() {
        // アンロード時の処理
    }
};
