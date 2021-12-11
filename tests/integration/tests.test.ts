/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import '../src/setup';
import 'jest';
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/database';
import faker from 'faker';
import { clearDatabase } from '../factories/clearDatabase';

beforeEach(async () => {
  clearDatabase();
});

describe('', () => {
  it('', async () => {

  });
});

afterAll(() => {
  connection.end();
});
