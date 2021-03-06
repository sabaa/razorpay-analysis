'use strict';
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const {getDateInSecs, normalizeDate, normalizeNotes} = require('../../dist/utils/razorpay-utils');
const {runCommonTests} = require('../../dist/utils/predefined-tests.js');
const SUB_PATH = '/virtual_accounts', FULL_PATH = `/v1${ SUB_PATH }`, TEST_VIRTUAL_ACCOUNT = '12345566', apiObj = rzpInstance.virtualAccounts;
const runIDRequiredTest = params => {
    let {apiObj, methodName, methodArgs, mockerParams} = params;
    mocker.mock(mockerParams);
};
function done () {}

module.exports.test10_0 = function () {
{
    apiObj[methodName](...methodArgs).then(() => {
        done(new Error(`method ${ methodName } does not` + ` check for Virtual Account ID`));
    }, err => {
        done();
    });
}}

module.exports.test10_1 = function () {
{
    let expectedParams = {
        skip: 0,
        count: 10
    };
    mocker.mock({ url: `${ SUB_PATH }` });
    rzpInstance.virtualAccounts.all().then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'skip & count are passed as default transfers queryparams');
        done();
    });
}}

module.exports.test10_2 = function () {
{
    let fromDate = 'Aug 25, 2016', toDate = 'Aug 30, 2016', fromDateInSecs = getDateInSecs(fromDate), toDateInSecs = getDateInSecs(toDate), expectedParams = {
            from: fromDateInSecs,
            to: toDateInSecs,
            count: 25,
            skip: 5
        };
    mocker.mock({ url: `${ SUB_PATH }` });
    rzpInstance.virtualAccounts.all({
        from: fromDate,
        to: toDate,
        count: 25,
        skip: 5
    }).then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'from & to dates are converted to ms');
        assert.equal(response.__JUST_FOR_TESTS__.url, `${ FULL_PATH }?from=${ fromDateInSecs }&to=${ toDateInSecs }&count=25&skip=5`, 'Params are appended as part of request');
        done();
    });
}}

module.exports.test10_3 = function () {
{
    mocker.mock({ url: `${ SUB_PATH }/${ undefined }` });
    rzpInstance.virtualAccounts.fetch().then(() => {
        done(new Error('`rzpInstance.virtualAccounts.fetch` doesn\'t' + ' check for account id'));
    }).catch(err => {
        done();
    });
}}

module.exports.test10_4 = function () {
{
    mocker.mock({ url: `${ SUB_PATH }/${ TEST_VIRTUAL_ACCOUNT }` });
    rzpInstance.virtualAccounts.fetch(TEST_VIRTUAL_ACCOUNT).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `${ FULL_PATH }/${ TEST_VIRTUAL_ACCOUNT }`, 'Fetch Virtual Account URL Match');
        done();
    });
}}

module.exports.test10_5 = function () {
{
    const params = {
            notes: { 'comment': 'My notes' },
            param1: 'param1',
            param2: 'param2'
        }, {
            notes,
            ...rest
        } = params;
    mocker.mock({
        url: `${ SUB_PATH }`,
        method: 'POST'
    });
    rzpInstance.virtualAccounts.create(params).then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestBody, Object.assign(rest, normalizeNotes(notes))), 'Params matched, and notes normalized');
        done();
    });
}}

module.exports.test10_6 = function () {
{
    mocker.mock({ url: `${ SUB_PATH }/${ undefined }` });
    rzpInstance.virtualAccounts.close().then(() => {
        done(new Error('virtualAccounts.close doesn\'t check for account id'));
    }).catch(() => {
        done();
    });
}}

module.exports.test10_7 = function () {
{
    mocker.mock({
        url: `${ SUB_PATH }/${ TEST_VIRTUAL_ACCOUNT }`,
        method: 'PATCH'
    });
    rzpInstance.virtualAccounts.close(TEST_VIRTUAL_ACCOUNT).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `${ FULL_PATH }/${ TEST_VIRTUAL_ACCOUNT }`, 'Url is formed correctly');
        done();
    });
}}
