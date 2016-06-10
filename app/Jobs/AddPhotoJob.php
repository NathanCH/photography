<?php

namespace App\Jobs;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class AddPhotoJob extends Job
{
    protected $file;

    public function __construct(UploadedFile $file)
    {
        $this->file = $file;
    }

    public function save()
    {
        //
    }

    protected function makePhoto()
    {
        //
    }

    protected function makeFileName()
    {
        //
    }
}
