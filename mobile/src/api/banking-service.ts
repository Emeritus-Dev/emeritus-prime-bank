import { apiClient, ApiResponse } from "./client";

export interface AccountData {
    id: string;
    name: string;
    number: string;
    balance: number;
    frozen: boolean;
    type?: string;
}

export interface TransferPayload {
    fromId: string;
    toId: string;
    amount: number;
}

export interface TransactionItem {
    id: string;
    merchant: string;
    date: string;
    amount: number;
    category: string;
}

export const BankingService = {
    // Authenticate with standard PIN (1234) or Duress PIN (9999)
    async authenticate(passcode: string): Promise<ApiResponse<{ token: string; isDuress: boolean; customerName: string }>> {
        return apiClient<{ token: string; isDuress: boolean; customerName: string }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ passcode }),
        });
    },

    // Fetch liquid accounts
    async getAccounts(): Promise<ApiResponse<AccountData[]>> {
        return apiClient<AccountData[]>("/accounts");
    },

    // Execute fund transfer between accounts
    async executeTransfer(payload: TransferPayload): Promise<ApiResponse<{ success: boolean; transactionId: string }>> {
        return apiClient<{ success: boolean; transactionId: string }>("/transfers", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    // Toggle card freeze status
    async toggleCardFreeze(accountId: string): Promise<ApiResponse<{ accountId: string; frozen: boolean }>> {
        return apiClient<{ accountId: string; frozen: boolean }>(`/cards/${accountId}/freeze`, {
            method: "PATCH",
        });
    },

    // Fetch recent transaction ledger
    async getTransactions(): Promise<ApiResponse<TransactionItem[]>> {
        return apiClient<TransactionItem[]>("/transactions");
    },
};