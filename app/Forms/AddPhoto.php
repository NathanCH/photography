<?php

namespace App\Forms;

use App\User;
use App\Photo;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class AddPhoto
{
    /**
     * The User instance.
     * 
     * @var User
     */
    protected $user;

    /**
     * The UploadedFile instance.
     * 
     * @var UploadedFile
     */
    protected $file;

    /**
     * @param User         $user
     * @param UploadedFile $file
     */
    public function __construct(User $user, UploadedFile $file)
    {
        $this->user = $user;
        $this->file = $file;
    }

    /**
     * Save photo to user.
     * 
     * @return void
     */
    public function save()
    {
        $photo = $this->user->addPhoto($this->makePhoto());

        $this->file->move($photo->baseDir(), $photo->name);
    }

    /**
     * Make a new photo instance.
     * 
     * @return Photo
     */
    protected function makePhoto()
    {
        return new Photo([
            'name' => $this->makeFileName()
        ]);
    }

    /**
     * Make a file name based on the uploaded file.
     * 
     * @return string
     */
    protected function makeFileName()
    {
        $name = sha1(
            date('d-m-Y-g-i') . $this->file->getClientOriginalName()
        );

        $extension = $this->file->getClientOriginalExtension();

        return "{$name}.{$extension}";
    }
}
