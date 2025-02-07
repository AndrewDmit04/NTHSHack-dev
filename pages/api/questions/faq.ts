import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { OrderedListOutlined } from '@ant-design/icons';

initializeApi();
const db = firestore();

const FAQS_COLLECTION = '/faqs';

/**
 *
 * Fetch all FAQs from the database
 *
 * @param req request object
 * @param res response object
 *
 *
 */
async function getFaqs(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(FAQS_COLLECTION).orderBy('order', 'asc').get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  res.json(data);
}

/**
 * Add a new FAQ to the database
 *
 * @param req request object
 * @param res response object
 */
async function addFaq(req: NextApiRequest, res: NextApiResponse) {
  const faqs = Array.isArray(req.body) ? req.body : [req.body];
  // const { question, answer } = req.body;

  try {
    const addedFaqs = [];
    for (const faq of faqs) {
      const { question, answer } = faq;
      if (!question || !answer) {
        return res.status(400).json({ msg: 'Both question and answer are required' });
      }
      const docRef = await db.collection(FAQS_COLLECTION).add({ question, answer });
      // Update the doc to include its own ID
      await docRef.update({ id: docRef.id });
      addedFaqs.push({ id: docRef.id, question, answer });
    }
    res.status(200).json({ msg: 'FAQ added successfully', faqs: addedFaqs });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding FAQ', error: error.message });
  }
}
/**
 * Delete a FAQ from the database
 *
 * @param req request object
 * @param res response object
 */
async function deleteFaq(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id); // debugging

  if (Array.isArray(id)) {
    return res.status(400).json({ msg: 'Invalid ID, expecting a single ID' });
  }

  if (!id) {
    return res.status(400).json({ msg: 'ID is required to delete' });
  }

  try {
    const docRef = db.collection(FAQS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ msg: 'FAQ not found' });
    }

    await docRef.delete();
    res.status(200).json({ msg: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting FAQ', error: error.message });
  }
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getFaqs(req, res);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return addFaq(req, res);
}

function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  return deleteFaq(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    case 'POST': {
      return handlePostRequest(req, res);
    }
    case 'DELETE': {
      return handleDeleteRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
