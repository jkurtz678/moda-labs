import { setActivePinia, createPinia } from 'pinia'
import { useTokenMetaStore } from '@/stores/token-meta'
import { describe, it, expect, beforeEach } from 'vitest'
import { type FirestoreDocument, type TokenMeta, type OpenseaToken, Blockchain, TokenPlatform, getTokenMetaUniqueChainID } from "@/types/types"
import { v4 as uuidv4 } from "uuid";

describe('Token Meta Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    }),
        it('properly filters all token metas', () => {
            const token_meta_store = useTokenMetaStore()

            const archive_only_off_chain: FirestoreDocument<TokenMeta> = {
                id: uuidv4(),
                entity: {
                    blockchain: Blockchain.OffChain,
                    platform: TokenPlatform.Archive
                } as TokenMeta
            }

            const archive_only_on_chain: FirestoreDocument<TokenMeta> = {
                id: uuidv4(),
                entity: {
                    blockchain: Blockchain.Ethereum,
                    platform: TokenPlatform.Archive,
                    asset_contract_address: uuidv4(),
                    token_id: uuidv4(),
                } as TokenMeta
            }

            // next pair are the same token, one on archive and one on opensea
            const archive_duplicate_on_chain: FirestoreDocument<TokenMeta> = {
                id: uuidv4(),
                entity: {
                    blockchain: Blockchain.Ethereum,
                    platform: TokenPlatform.Archive,
                    asset_contract_address: uuidv4(),
                    token_id: uuidv4(),
                } as TokenMeta
            }
            const opensea_minted_duplicate_with_archive: OpenseaToken = {
                asset_contract: { address: archive_duplicate_on_chain.entity.asset_contract_address! },
                token_id: archive_duplicate_on_chain.entity.token_id!,
            } as OpenseaToken

            // next pair are same token but show up in both minted and wallet tokens
            const opensea_minted_duplicate_with_wallet: OpenseaToken = {
                asset_contract: { address: uuidv4()},
                token_id: uuidv4(),
            } as OpenseaToken
            const opensea_wallet_duplicated_with_minted: OpenseaToken = {
                asset_contract: { address: opensea_minted_duplicate_with_wallet.asset_contract.address},
                token_id: opensea_minted_duplicate_with_wallet.token_id!,
            } as OpenseaToken

            // unique opensea token
            const opensea_wallet_unique: OpenseaToken = {
                asset_contract: { address: uuidv4()},
                token_id: uuidv4(),
            } as OpenseaToken

            // total we have 7 tokens in store, but only 5 are unique, two of the 4 opensea tokens are duplicated elsewhere
            token_meta_store.archive_token_meta_list = [archive_only_off_chain, archive_only_on_chain, archive_duplicate_on_chain];
            token_meta_store.opensea_minted_token_meta_list = [opensea_minted_duplicate_with_archive, opensea_minted_duplicate_with_wallet];
            token_meta_store.opensea_wallet_token_meta_list = [opensea_wallet_duplicated_with_minted, opensea_wallet_unique];

            expect(Object.values(token_meta_store.all_token_metas)).toHaveLength(5)
            const archive_tokens = Object.values(token_meta_store.all_token_metas).filter(t => t.entity.platform == TokenPlatform.Archive)
            expect(archive_tokens).toHaveLength(3)
            const opensea_tokens = Object.values(token_meta_store.all_token_metas).filter(t => t.entity.platform == TokenPlatform.Opensea)
            expect(opensea_tokens).toHaveLength(2)
        })
});