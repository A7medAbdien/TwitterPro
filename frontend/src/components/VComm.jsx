import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { Venn } from './charts/Venn';


export const VComm = ({ res }) => {
    let user = 10, following = 10, comm = 2

    if (res.length < 1) return

    [user, following, comm] = res[1]
    return <>
        <Venn
            user={user}
            following={following}
            comm={comm}
        />
    </>
}

