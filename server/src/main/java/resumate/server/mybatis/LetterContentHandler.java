package resumate.server.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import com.google.gson.Gson;

import resumate.server.dto.LetterContent;

public class LetterContentHandler extends BaseTypeHandler<List<LetterContent>> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<LetterContent> parameter, JdbcType jdbcType)
            throws SQLException {
        Gson gson = new Gson();
        ps.setString(i, gson.toJson(parameter));
    }

    @Override
    public List<LetterContent> getNullableResult(ResultSet rs, String columnName)
            throws SQLException {
        return null;
    }

    @Override
    public List<LetterContent> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return null;
    }

    @Override
    public List<LetterContent> getNullableResult(CallableStatement cs, int columnIndex)
            throws SQLException {
        return null;
    }
}
