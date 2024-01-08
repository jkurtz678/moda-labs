// When the component is mounted, it should call the checkMetamaskExtension function.
import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AccountSettings from "@/components/AccountSettings.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAccountStore } from "@/stores/account"
import { Timestamp } from "firebase/firestore"
import detectEthereumProvider from "@metamask/detect-provider";

// vi.mock("@metamask/detect-provider", () => {
//   return vi.fn(() => Promise.resolve(true));
// });
describe("AccountSettings", () => {
  let wrapper;

  beforeEach(async () => {
    // setup testing pinia
    const test_pinia = createTestingPinia({ createSpy: vi.fn })

    // setup test account
    const account_store = useAccountStore();
    account_store.account = { id: "test-id", entity: { email: "test@test.com", created_at: Timestamp.now(), updated_at: Timestamp.now() } };

    wrapper = await mount(AccountSettings, {
      global: {
        plugins: [
          test_pinia
        ]
      }
    });
  });

  it("mounts properly", () => {
    expect(wrapper.vm).toBeTruthy();
  })
});