..  include:: /Includes.rst.txt

=====================
Developer
=====================

Testing
=======

The extension contains unit and functional tests.

Run a single unit-test method
-----------------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.xml \
        vendor/madj2k/t3-klarokratie/Tests/Unit/Whatever/Whatever.php \
        --filter MethodName

Run a single functional-test method
-----------------------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.functional.xml \
        vendor/madj2k/t3-klarokratie/Tests/Functional/Whatever/Whatever.php \
        --filter MethodName

Run a single unit-test file
---------------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.xml \
        vendor/madj2k/t3-klarokratie/Tests/Unit/Whatever/Whatever.php

Run a single functional-test file
---------------------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.functional.xml \
        vendor/madj2k/t3-klarokratie/Tests/Functional/Whatever/Whatever.php

Run all unit tests
------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.xml

Run all functional tests
------------------------

..  code-block:: bash

    ddev exec vendor/bin/phpunit -c vendor/madj2k/t3-klarokratie/phpunit.functional.xml

