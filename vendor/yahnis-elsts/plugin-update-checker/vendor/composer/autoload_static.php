<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit827424aa73f531f0cc78bda0c2559c93
{
    public static $files = array (
        '49a1299791c25c6fd83542c6fedacddd' => __DIR__ . '/../..' . '/load-v4p11.php',
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit827424aa73f531f0cc78bda0c2559c93::$classMap;

        }, null, ClassLoader::class);
    }
}
