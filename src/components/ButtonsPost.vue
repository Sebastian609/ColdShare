<script setup></script>

<template>
  <div class="row justify-content-start gap-2 w-90">
    <button class="btn btn-success col-sm-auto col-xs-auto ">
      <div class="row">
        <div class="col">Like</div>
        <div class="col">
          <box-icon type="solid" name="like" color="#FFF"></box-icon>
        </div>
      </div>
    </button>

    <button class="btn btn-danger col-sm-auto col-xs-auto ">
      <div class="row">
        <div class="col">Dislike</div>
        <div class="col">
          <box-icon type="solid" name="dislike" color="#FFF"></box-icon>
        </div>
      </div>
    </button>

    <button class="btn btn-primary col-sm-auto col-xs-auto">
      <div class="row">
        <div class="col">Share</div>
        <div class="col">
          <box-icon name='share' type='solid' color="#FFF" ></box-icon>
        </div>
      </div>
    </button>
  </div>
</template>
