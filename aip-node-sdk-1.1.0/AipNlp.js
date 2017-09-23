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
 * @file AipNlp
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClientNlp = require('./http/httpClientNlp');

const objectTools = require('./util/objectTools');

const EventPromise = require('./util/eventPromise');

const METHOD_POST = 'POST';

const PATH_NLP_DNNLM_CN = '/rpc/2.0/nlp/v2/dnnlm\_cn';
const PATH_NLP_COMMENT_TAG = '/rpc/2.0/nlp/v2/comment\_tag';
const PATH_NLP_WORDSEG = '/rpc/2.0/nlp/v1/wordseg';
const PATH_NLP_WORDPOS = '/rpc/2.0/nlp/v1/wordpos';
const PATH_NLP_SIMNET  = '/rpc/2.0/nlp/v2/simnet';
const PATH_NLP_WORDEMBEDDINGVEC  = '/rpc/2.0/nlp/v2/word_emb_vec';
const PATH_NLP_WORDEMBEDDINGSIM  = '/rpc/2.0/nlp/v2/word_emb_sim';
const PATH_NLP_SENTIMENT_CLASSIFY  = '/rpc/2.0/nlp/v1/sentiment_classify';
const PATH_NLP_LEXER  = '/rpc/2.0/nlp/v1/lexer';

const scope = require('./const/devScope').DEFAULT;

/**
 * AipNlp类，构造调用自然语言识别对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipNlp extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    dnnlmCn(text) {
        let promise = this.registTask(this.dnnlmCnImpl, {text: text});
        return promise;
    }
    dnnlmCnImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_DNNLM_CN,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.dnnlmCnImpl, param);
        }
        return promise;
    }
    wordseg(query) {
        let promise = this.registTask(this.wordsegImpl, {query: query});
        return promise;
    }
    wordsegImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_WORDSEG,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.wordsegImpl, param);
        }
        return promise;
    }
    wordpos(query) {
        let promise = this.registTask(this.wordposImpl, {query: query});
        return promise;
    }
    wordposImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_WORDPOS,
            scope, param, METHOD_POST);
        this.preRequest(requestInfo);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.wordposImpl, param);
        }
        return promise;
    }
    commentTag(text, type) {
        let promise = this.registTask(this.commentTagImpl,
            {text: text, type: type.toString()});
        return promise;
    }
    commentTagImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_COMMENT_TAG,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.commentTagImpl, param);
        }
        return promise;
    }
    simnet(query1, query2, options) {
        let param = {
            text_1: query1,
            text_2: query2
        };
        let promise = this.registTask(this.simnetImpl, objectTools.merge(param, options));
        return promise;
    }
    simnetImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_SIMNET,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
            return promise;
        } else {
            return this.registTask(this.simnetImpl, param);
        }
    }
    wordembedding(word, options) {
        let param = {word: word};
        let promise = this.registTask(this.wordembeddingImpl, objectTools.merge(param, options));
        return promise;
    }
    wordembeddingImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_WORDEMBEDDINGVEC,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.wordembeddingImpl, param);
        }
        return promise;
    }
    wordSimEmbedding(word1, word2) {
        let formData = {word_1: word1, word_2: word2};
        let promise = this.registTask(this.wordSimEmbeddingImpl, formData);
        return promise;
    }
    wordSimEmbeddingImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_WORDEMBEDDINGSIM,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.wordSimEmbeddingImpl, param);
        }
        return promise;
    }
    sentimentClassify(text) {
        let formData = {text: text};
        let promise = this.registTask(this.sentimentClassifyImpl, formData);
        return promise;
    }
    sentimentClassifyImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_SENTIMENT_CLASSIFY,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.sentimentClassifyImpl, param);
        }
        return promise;
    }
    lexer(text) {
        let formData = {text: text};
        let promise = this.registTask(this.lexerImpl, formData);
        return promise;
    }
    lexerImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let requestInfo = new RequestInfo(PATH_NLP_LEXER,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.lexerImpl, param);
        }
        return promise;
    }
}

module.exports = AipNlp;
