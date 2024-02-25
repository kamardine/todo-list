import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TodoListItem from "../todolist/TodoListItem.vue";

describe("TodoListItem", () => {
  it("renders properly", () => {
    const itemTest = {
      id: 120393,
      libelle: "Test",
      checked: false,
      edited: false,
    };
    const wrapper = mount(TodoListItem, { props: { item: itemTest } });

    expect(wrapper.text()).toContain(itemTest);
  });
});
