
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class ExpressDemo extends Simulation {

	val httpProtocol = http
		.baseURL("http://localhost:3000")
		.inferHtmlResources()
		.acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0")

	val headers_2 = Map("Accept" -> "*/*")

	val headers_5 = Map("Content-Type" -> "application/ocsp-request")

    val uri1 = "ocsp.digicert.com"
    val uri2 = "http://bam.nr-data.net/1/6f0c074d55"

	val scn1 = scenario("ExpressDemo")
	.forever(pace(5 seconds)

		.exec(http("request_0")
			.get("/")
			.resources(http("request_1")
			.get(uri2 + "?a=8468007&v=892.e77dac2&to=blYAYUpRVkcHUxJRWlccJ01IQl1HFVoVF3J8Z00a&rst=1349&ap=49.678498&be=1282&fe=48&dc=16&tt=dfcf010b576b18&f=%5B%22err%22,%22xhr%22,%22stn%22,%22ins%22%5D&perf=%7B%22timing%22:%7B%22of%22:1459249520211,%22n%22:0,%22dl%22:1256,%22di%22:1296,%22ds%22:1297,%22de%22:1298,%22dc%22:1328,%22l%22:1328,%22le%22:1329,%22f%22:2,%22dn%22:2,%22dne%22:2,%22c%22:2,%22ce%22:2,%22rq%22:3,%22rp%22:1256,%22rpe%22:1256%7D,%22navigation%22:%7B%7D%7D&jsonp=NREUM.setToken")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_3")
			.get("/newuser")
			.resources(http("request_4")
			.get(uri2 + "?a=8468007&v=892.e77dac2&to=blYAYUpRVkcHUxJRWlccJ01IQl1HFVoVF3J8Z00aVlVPQRVVFA%3D%3D&rst=149&ap=58.669252&be=109&fe=28&dc=23&tt=dc7dd1f87b0620&f=%5B%22err%22,%22xhr%22,%22stn%22,%22ins%22%5D&perf=%7B%22timing%22:%7B%22of%22:1459249548800,%22n%22:0,%22u%22:84,%22ue%22:90,%22dl%22:84,%22di%22:128,%22ds%22:131,%22de%22:131,%22dc%22:136,%22l%22:136,%22le%22:137,%22f%22:1,%22dn%22:1,%22dne%22:1,%22c%22:1,%22ce%22:1,%22rq%22:1,%22rp%22:83,%22rpe%22:83%7D,%22navigation%22:%7B%7D%7D&jsonp=NREUM.setToken")
			.headers(headers_2),
            http("request_5")
			.post("http://" + uri1 + "/")
			.headers(headers_5)
			.body(RawFileBody("RecordedSimulation_0005_request.txt"))))
		.pause(1)
		.exec(http("request_6")
			.post("/adduser")
			.formParam("username", "gatling")
			.formParam("useremail", "gatling@gatling.io")
			.resources(http("request_7")
			.get(uri2 + "?a=8468007&v=892.e77dac2&to=blYAYUpRVkcHUxJRWlccJ01IQl1HFVoVF3J8Z00aTUNdRgpZFUw%3D&rst=2812&ap=897.418989&be=2187&fe=590&dc=351&tt=150adeea0be9490&f=%5B%22err%22,%22xhr%22,%22stn%22,%22ins%22%5D&perf=%7B%22timing%22:%7B%22of%22:1459249560645,%22n%22:0,%22u%22:2155,%22ue%22:2159,%22dl%22:2155,%22di%22:2262,%22ds%22:2537,%22de%22:2538,%22dc%22:2776,%22l%22:2776,%22le%22:2777,%22r%22:1,%22re%22:550,%22f%22:551,%22dn%22:551,%22dne%22:551,%22c%22:551,%22ce%22:551,%22rq%22:552,%22rp%22:2152,%22rpe%22:2152%7D,%22navigation%22:%7B%22rc%22:1%7D%7D&jsonp=NREUM.setToken")
			.headers(headers_2)))
		)

	setUp(scn1.inject(atOnceUsers(20))).protocols(httpProtocol)
}
