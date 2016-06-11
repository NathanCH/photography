<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotosTable extends Migration
{
    public function up()
    {
        Schema::create('photos', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
            $table->string('name');
            $table->string('path');
            $table->string('thumbnail_path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('photos');
    }
}
