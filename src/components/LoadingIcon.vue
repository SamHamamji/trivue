<template>
  <div class="loading-icon mx-auto" />
</template>

<style>
.loading-icon {
  width: 50px;
  height: 50px;
  border: 6px solid hsl(var(--p));
  border-bottom-color: #fff0;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
