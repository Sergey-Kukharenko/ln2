#!/bin/bash

COMMAND_GIT=`which git`
COMMAND_YARN=`which yarn`

time_start=$(date  +%d.%m.%Y\ %H:%M:%S)

usage () {
    echo "Использование: $0 [option]"
    echo "Опции:"
    echo -e "\t run - запустить обновление"	
}

main_run () {
    echo 'Запуск обновления...'    

    ${COMMAND_GIT} checkout yarn.lock
    ${COMMAND_GIT} pull
    rm yarn.lock
    ${COMMAND_YARN} install
    ${COMMAND_YARN} generate
    ${COMMAND_YARN} pm2:restart    
}

if [ -n "$1" ]; then
    if [ "$1" == 'run' ]; then
        main_run
    fi

    time_finish=$(date  +%d.%m.%Y\ %H:%M:%S)
    
    echo $time_start
    echo $time_finish
else
    usage
fi
