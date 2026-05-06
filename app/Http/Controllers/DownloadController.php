<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function checklist(Request $request)
    {
        $path = storage_path('app/downloads/checklist-python-ia.pdf');

        if (!file_exists($path)) {
            abort(404, 'Archivo no disponible todavía.');
        }

        return response()->download($path, 'checklist-python-ia-darkcode.pdf');
    }
}
