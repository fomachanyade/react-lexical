/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import { WebsocketProvider } from 'y-websocket';
 import * as yjs from 'yjs';
 import {Doc} from 'yjs';
 
 const url = new URL(window.location.href);
 const params = new URLSearchParams(url.search);
 const WEBSOCKET_ENDPOINT = 'ws://localhost:1234';
 const WEBSOCKET_SLUG = 'playground';
 const WEBSOCKET_ID = params.get('collabId') || '0';
 
 console.log(yjs)

 // parent dom -> child doc
 export function createWebsocketProvider(
   id: string,
   yjsDocMap: Map<string, Doc>,
 ): WebsocketProvider {
   let doc = yjsDocMap.get(id);
 
   if (doc === undefined) {
     doc = new Doc();
     yjsDocMap.set(id, doc);
   } else {
     doc.load();
   }
 
   const provider = new WebsocketProvider(
     WEBSOCKET_ENDPOINT,
     WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id,
     doc,
     {
       connect: true,
     },
   );
   console.log("provider", provider)
   return provider
 }