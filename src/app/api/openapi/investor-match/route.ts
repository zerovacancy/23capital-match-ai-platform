import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function GET() {
  try {
    // Path to the YAML schema file
    const schemaPath = path.join(process.cwd(), 'public', 'openapi', 'investor-match-schema.yaml');
    
    // Read the YAML file
    const yamlContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Convert YAML to JSON
    const jsonSchema = yaml.load(yamlContent);
    
    // Return the schema as JSON
    return NextResponse.json(jsonSchema);
  } catch (error) {
    console.error('Error serving OpenAPI schema:', error);
    return NextResponse.json(
      { error: 'Failed to load OpenAPI schema' },
      { status: 500 }
    );
  }
}