import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import Header from '../Header.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Header', () => {

  const mockRouter = createRouter({ history: createWebHistory(), routes: [] });

  it('renders properly', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), mockRouter],
      }
    })
    expect(wrapper).toBeTruthy();
  })
})
