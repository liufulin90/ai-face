'use strict';
/**
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipAntiporn
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClient = require('./http/httpClient');

const HttpClientForCombo = require('./http/httpClientExt');

const EventPromise = require('./util/eventPromise');

const httpHeader = require('./const/httpHeader');

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';

const PATH_ANTIPORN = '/rest/2.0/antiporn/v1/detect';
const PATH_ANTITERROR = '/rest/2.0/antiterror/v1/detect';
const PATH_ANTIPORN_GIF = '/rest/2.0/antiporn/v1/detect_gif';
const PATH_FACEAUDIT = '/rest/2.0/solution/v1/face_audit';
const PATH_COMBOCENSOR = '/api/v1/solution/direct/img_censor';



const scope = require('./const/devScope').DEFAULT;


/**
 * AipAntiporn类，构造调用色情识别对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageCensor extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    antiPorn(image) {
        let promise = this.registTask(this.antiPornImpl, {image: image});
        return promise;
    }
    antiPornImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_ANTIPORN,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.antiPornImpl, param);
        }
        return promise;
    }
    antiPornGif(image) {
        let promise = this.registTask(this.antiPornGifImpl, {image: image});
        return promise;
    }
    antiPornGifImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_ANTIPORN_GIF,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.antiPornGifImpl, param);
        }
        return promise;
    }
    antiTerror(image) {
        let promise = this.registTask(this.antiTerrorImpl, {image: image});
        return promise;
    }
    antiTerrorImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_ANTITERROR,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.antiTerrorImpl, param);
        }
        return promise;
    }
    faceAudit(images, type, configId) {
        let param = {configId: configId};
        if (type === 'url') {
            images = images.map(function (elm) {
                return encodeURIComponent(elm);
            });
            param.imgUrls = images.join(',');
        }
        if (type === 'base64') {
            param.images = images.join(',');
        }
        let promise = this.registTask(this.faceAuditImpl, param);
        return promise;
    }
    faceAuditImpl(param) {
        let headers = {};
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let requestInfo = new RequestInfo(PATH_FACEAUDIT,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.faceAuditImpl, param);
        }
        return promise;
    }
    imageCensorComb(image, type, censors, scenesConf) {
        let param = {};
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.scenes = censors;
        param.sceneConf = scenesConf;

        let promise = this.registTask(this.imageCensorCombImpl, param);
        return promise;
    }
    imageCensorCombImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientForCombo();
        let requestInfo = new RequestInfo(PATH_COMBOCENSOR,
            scope, param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.imageCensorCombImpl, param);
        }
        return promise;
    }
}

module.exports = AipImageCensor;