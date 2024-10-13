from openai import OpenAI as openai
import json

#Create a client instance to interact with the OpenAI API
client = openai(api_key='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')

def load_json_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def create_json_file(data):
    """Creates a new JSON file and writes the given data to it."""
    file_path = "Output.json"  # Define the new file name
    try:
        with open(file_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)  # Write data with pretty formatting
        print(f"Data successfully written to {file_path}")
    except Exception as e:
        print(f"An error occurred while writing to the file: {e}")


def chat_with_gpt(prompt, json_data):
    # Create a system message that informs the model about the context
    system_message = "You can only answer questions based on the provided information. Do not extract information from elsewhere, but feel free to make small generalizations from the given information. Your goal is to provide specific, objective answers to the prompt and help the user. Do not mention that there is data provided."

    # Construct the prompt including the JSON data
    context = json.dumps(json_data)
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": f"Here is the data: {context}. {prompt}"}
    ]

    # Call the OpenAI API
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # or the model you're using
        messages=messages
    )

    # Extract and return the assistant's reply
    assistant_reply = response.choices[0].message.content
    return assistant_reply

if __name__ == "__main__":
    # Load your JSON data
    json_file_path = './provided.json'  # Update with your JSON file path
    json_data = load_json_data(json_file_path)

    user_prompt = "Write a detailed summary of the provided data."
    reply = chat_with_gpt(user_prompt, json_data)
    create_json_file(reply)
    print(f"Assistant: {reply}")
