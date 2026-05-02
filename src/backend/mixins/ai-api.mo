import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin () {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func askAI(prompt : Text) : async Text {
    let url = "https://openrouter.ai/api/v1/chat/completions";
    let body = "{ \"model\": \"meta-llama/llama-3.1-8b-instruct:free\", \"messages\": [{ \"role\": \"user\", \"content\": \"" # prompt # "\" }] }";
    let headers = [
      { name = "Content-Type"; value = "application/json" },
      { name = "HTTP-Referer"; value = "https://caffeine.ai" },
    ];
    try {
      let response = await OutCall.httpPostRequest(url, headers, body, transform);
      response;
    } catch (_) {
      "{ \"error\": \"AI service temporarily unavailable. Please try again later.\" }";
    };
  };
};
