/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

var features = [
    'A group chat',
    'User typing indicator',
    'Don\'t miss the action and see New Messages',
    'Easy Sign up process',
    'See current logged in user list'
];

// Gets a list of Things
export function index(req, res) {
  res.json(features);
}
