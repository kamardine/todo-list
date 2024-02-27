<template>
  <div
    class="bg-white w-full m-5 rounded-md space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
  >
    <div class="flex justify-center items-center">
      <h2 class="font-semibold text-slate-900 text-xl uppercase">Todo list</h2>
      <p
        v-if="todoListCompleted"
        class="font-semibold text-green-500 lowercase ml-1"
      >
        completed !
      </p>
    </div>

    <TodoListInput
      @add-new-item="handleAddNewItem"
      @update-item="handleUpdateItem"
      :editable-item="editableItem"
    />

    <div v-if="itemsList.length > 0">
      <ul class="divide-y divide-gray-200">
        <TodoListItem
          v-for="item in itemsList"
          :item="item"
          :key="item.id"
          @delete-item="handleDeletItem"
          @handle-checked="handleChecked"
          @edit-item="handleEditItem"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import TodoListInput from "./todolist/TodoListInput.vue";
import TodoListItem from "./todolist/TodoListItem.vue";
import type { NewItemTodo } from "@/types/todoItem";

const itemsList = ref<NewItemTodo[]>([]);

const editableItem = ref({
  id: 0,
  libelle: "",
  checked: false,
  edited: false,
});

watch(
  () => itemsList,
  (newItemsList, oldItemsList) => {
    console.log("watch itemsList.value : ", itemsList.value);
  }
);

const handleAddNewItem = (item: NewItemTodo) => {
  itemsList.value.push(item);
};

const handleDeletItem = (item: NewItemTodo) => {
  const index = itemsList.value.indexOf(item);

  if (index > -1) {
    itemsList.value.splice(index, 1);
  }
};

const handleChecked = (item: NewItemTodo) => {
  const index = itemsList.value.findIndex((val) => val.id === item.id);
  itemsList.value[index].checked = item.checked;
};

const handleEditItem = (item: NewItemTodo) => {
  initEditedItem();

  const index = itemsList.value.findIndex((val) => val.id === item.id);
  itemsList.value[index].edited = item.edited;
  editableItem.value = itemsList.value[index];
};

const handleUpdateItem = (item: NewItemTodo) => {
  const index = itemsList.value.findIndex((val) => val.id === item.id);
  itemsList.value[index].libelle = item.libelle;
  itemsList.value[index].edited = item.edited;

  editableItem.value = {
    id: 0,
    libelle: "",
    checked: false,
    edited: false,
  };
};

const todoListCompleted = computed(() => {
  if (itemsList.value.length > 0) {
    return itemsList.value.find((val) => val.checked === false) ? false : true;
  }

  return false;
});

const initEditedItem = () => {
  for (let i = 0; i < itemsList.value.length; i++) {
    itemsList.value[i].edited = false;
  }
};
</script>
