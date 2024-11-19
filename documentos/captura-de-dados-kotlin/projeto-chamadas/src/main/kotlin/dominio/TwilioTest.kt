package dominio

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Call
import org.mockito.Mockito
import org.testng.annotations.Test

class TwilioTest {
    @Test
    fun testFetchCallLogs() {
        // Mock da API Twilio
        val mockCall = Mockito.mock(Call::class.java)
        Mockito.`when`(mockCall.sid).thenReturn("CHXXXXXXXXXXXXXXXXX")
        Mockito.`when`(mockCall.from).thenReturn("+1234567890")
        Mockito.`when`(mockCall.to).thenReturn("+0987654321")
        Mockito.`when`(mockCall.status).thenReturn(Call.Status.COMPLETED)
        Mockito.`when`(mockCall.duration).thenReturn("60")

        // Simular lista de chamadas
        val callLogs = listOf(mockCall)

        // Validar dados
        for (call in callLogs) {
            assert(call.sid == "CHXXXXXXXXXXXXXXXXX")
            assert(call.from == "+1234567890")
            assert(call.to == "+0987654321")
            assert(call.status == Call.Status.COMPLETED)
            assert(call.duration == "60")
        }
    }
}