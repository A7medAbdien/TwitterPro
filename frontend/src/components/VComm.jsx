import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { Venn } from './charts/Venn';


export const VComm = ({ res, title }) => {
    let user = 10, following = 10, comm = 2

    if (!res || res.venn.length < 1) return

    [user, following, comm] = res.venn
    return <>
        <Venn
            title={title}
            user={user}
            following={following}
            comm={comm}
        />
    </>
}

