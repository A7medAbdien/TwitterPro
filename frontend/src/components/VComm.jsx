import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { Venn } from './charts/Venn';


export const VComm = ({ venn, title, a, b, dimensions }) => {
    let user = 10, following = 10, comm = 2, height = 500, width = 500

    if (!venn || venn.length < 1) return

    [user, following, comm] = venn

    if (!dimensions) return
    [height, width] = dimensions
    return <>
        <Venn
            title={title}
            user={user}
            following={following}
            comm={comm}
            a={a}
            b={b}
            height={height}
            width={width}
        />
    </>
}

