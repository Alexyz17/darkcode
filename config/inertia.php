<?php

return [

    // Las páginas viven en resources/js/Pages (con mayúscula), igual que en app.tsx.
    // En Linux las rutas distinguen mayúsculas, así que hay que indicarlo explícitamente.
    'pages' => [
        'ensure_pages_exist' => false,
        'paths' => [resource_path('js/Pages')],
        'extensions' => ['js', 'jsx', 'ts', 'tsx'],
    ],

    'testing' => [
        'ensure_pages_exist' => true,
    ],

];
