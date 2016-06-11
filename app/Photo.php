<?php

namespace App;

use File;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Photo extends Model
{
    protected $table = 'photos';

    protected $fillable = [
    	'name',
    	'path', 
    	'thumbnail_path'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function baseDir() {
        return 'storage/photos';
    }

    public function setNameAttribute($name)
    {
        $this->attributes['name'] = $name;

        $this->path = '/' . $this->baseDir() .'/'. $name;
        $this->thumbnail_path = '/' . $this->baseDir() .'/tn-'. $name;
    }

    public function delete()
    {
        File::delete([
            $this->path,
            $this->thumbnail_path
        ]);

        parent::delete();
    }
}
