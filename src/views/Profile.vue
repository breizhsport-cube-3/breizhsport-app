<template>
  <div class="max-w-2xl mx-auto py-6">
    <h1 class="text-3xl font-bold text-center mb-8">User Profile</h1>
    <div class="text-center mb-8">
      <Avatar
        :image="user.avatar"
        :alt="user.name"
        size="xlarge"
        shape="circle"
        class="mb-4"
      />
      <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
      <p class="text-gray-600">{{ user.email }}</p>
      <p class="mt-2 text-gray-700">{{ user.bio }}</p>
    </div>

    <Card class="mb-8">
      <Divider class="my-4" />
      <div class="flex justify-center space-x-8">
        <div class="text-center">
          <strong class="block text-gray-700">Posts</strong>
          <span class="text-xl">{{ user.posts }}</span>
        </div>
        <div class="text-center">
          <strong class="block text-gray-700">Followers</strong>
          <span class="text-xl">{{ user.followers }}</span>
        </div>
        <div class="text-center">
          <strong class="block text-gray-700">Following</strong>
          <span class="text-xl">{{ user.following }}</span>
        </div>
      </div>
      <Divider class="my-4" />
    </Card>

    <div class="text-center">
      <Button
        label="Edit Profile"
        icon="pi pi-user-edit"
        @click="editProfile"
        severity="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Divider from "primevue/divider";
import Button from "primevue/button";

interface User {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
}

const user = ref<User>({
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Web developer and tech enthusiast",
  avatar: "https://example.com/avatar.jpg",
  posts: 42,
  followers: 1337,
  following: 420,
});

const editProfile = () => {};
</script>
