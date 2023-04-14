import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { Venn } from './charts/Venn';


export const VComm = ({ venn, title, a, b }) => {
    let user = 10, following = 10, comm = 2

    if (!venn || venn.length < 1) return

    [user, following, comm] = venn
    return <>
        <Venn
            title={title}
            user={user}
            following={following}
            comm={comm}
            a={a}
            b={b}
        />
    </>
}

