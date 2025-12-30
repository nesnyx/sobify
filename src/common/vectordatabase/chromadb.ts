import { ChromaClient, Collection } from "chromadb";
import { GoogleGenAI } from "@google/genai";
import { v7 as uuidv7 } from 'uuid';

const client = new ChromaClient({
    path: "http://localhost:8888",
});

const apiKey = process.env.GOOGLE_API_KEY;

export class VectorDatabase {
    collection: Collection | null;
    constructor() {
        this.collection = null;
    }

    async init() {
        this.collection = await client.getOrCreateCollection({ name: "sobify" });
    }

    embeddingGoogle = async (text: string) => {
        const genAI = new GoogleGenAI({
            apiKey: apiKey,
        });
        const response = await genAI.models.embedContent({
            model: 'gemini-embedding-001',
            contents: text,  // For single string input
        });
        console.log("Embedding Result:", response);
        // Extract embeddings as number[][], handling potential undefined values
        return response.embeddings?.map(e => e.values ?? []) ?? [];
    };

    addData = async (data: string) => {
        const generatedUUID = uuidv7();
        const embedding = await this.embeddingGoogle(data);
        const collectionDB = await this.collection?.add({
            ids: [String(generatedUUID)],
            embeddings: embedding,  // Now guaranteed to be number[][]
            documents: [data],  // Use the actual data as the document
        });
        return collectionDB;
    };
}