<?php
/**
 * Anonymous function that registers a custom autoloader
 */
return function ($prefix, $baseDir) {
    spl_autoload_register(function ($class) use ($prefix, $baseDir) {
        // does the class use the namespace prefix?
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            // no, move to the next registered autoloader
            return;
        }

        // get the relative class name
        $relative_class = substr($class, $len);

        // replace the namespace prefix with the base directory, replace namespace
        // separators with directory separators in the relative class name, append
        // with .php
        $file = $baseDir . str_replace('\\', '/', $relative_class) . '.php';

//        print_r(file_exists($file));
//        die();

        // if the file exists, require it
        if (file_exists($file)) {
            require $file;
        }
    });
};
