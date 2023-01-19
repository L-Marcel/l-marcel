import { GraphQLClient } from "graphql-request";

export class Graphql {
  private static readonly token = process.env.GRAPHQL_TOKEN ?? "";
  private static readonly endpoint = process.env.GRAPHQL_ENDPOINT ?? "";

  static api = new GraphQLClient(this.endpoint, {
    headers: {
      authorization: `Bearer ${this.token}`,
    }
  });

  static async getInformation(locale: "BR" | "EN" = "BR") {
    return await this.api.request(`
      query MyAchivements {
        achievements(orderBy: registered_in_DESC) {
          id
          title
          subtitle
          description
          registered_in
          expires_in
          url
          code
          icon
          button_icon
          button_text
        }
      }
    `, undefined, {
      "gcms-locales": locale
    });
  }
}