#!/usr/bin/env bash
#
# SPDX-FileCopyrightText: 2015 ownCloud, Inc.
# SPDX-License-Identifier: AGPL-3.0-only
#
# Set environment variable DEBUG to print config file
#

# retrieve current folder to place the config in the parent folder
thisFolder=`echo $0 | sed 's#env/start-smb-windows\.sh##'`

if [ -z "$thisFolder" ]; then
    thisFolder="."
fi;

user=smb-test
password=!owncloud123
host=WIN-9GTFAS08C15

if ! "$thisFolder"/env/wait-for-connection ${host} 445; then
    echo "[ERROR] Server not reachable" >&2
    exit 1
fi

cat > $thisFolder/config.smb.php <<DELIM
<?php

return array(
    'run'=>true,
    'host'=>'$host',
    'user'=>'$user',
    'password'=>'$password',
    'share'=>'oc-test',
    'root'=>'',
);

DELIM
