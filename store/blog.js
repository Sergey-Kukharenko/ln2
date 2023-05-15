import { setState } from '@/helpers';

export const state = () => ({
  blog: null
});

export const mutations = {
  setState,

  setBlogList(state, { list, pagination }) {
    state.blog = {
      ...state.blog,
      list: [...state.blog.list, ...list],
      pagination
    };
  }
};

export const actions = {
  async fetchBlog({ commit }, { slug, params, isConcated = false }) {
    try {
      const blog = await this.$axios.$get(`/category/${slug}/`, { params });
      if (!isConcated) {
        commit('setState', { blog });

        return;
      }

      commit('setBlogList', blog);
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getBlogSeo: (state) => state.blog.seo,
  getBlog: (state) => state.blog
};
